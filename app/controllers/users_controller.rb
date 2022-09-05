class UsersController < ApplicationController

    skip_before_action :authorize, only: [:create]

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        shopping_session = user.shopping_sessions.create!(user_id: user.id, status: "active")
        render json: [user, shopping_session], status: :ok
    end

    def show
        user = find_user
        current_shopping_session = user.shopping_sessions.find_by(status: "active")
        if user
            render json: [user, current_shopping_session] , status: :ok
        else
            render json: { errors: ["Not Authorized"] }, status: :unauthorized
        end
    end

    def update
        user = find_user
        user.update!(user_params)
        render json: user, status: :accepted
    end

    def destroy
        user = find_user
        user.destroy
        head :no_content
    end 

    private

    def render_not_found_response
        render json: { errors: ["User Not Found"]}, status: :not_found
    end

    def user_params
        params.permit(:username, :password, :first_name, :last_name, :email, :telephone)
    end

end
