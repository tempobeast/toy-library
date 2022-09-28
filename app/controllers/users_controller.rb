class UsersController < ApplicationController

    skip_before_action :authorize, only: [:create]

    def index 
        user = find_user
        if user.is_admin
            users = User.all
            render json: users, status: :ok
        else
            render json: { errors: ["Not Authorized"]}, status: :unauthorized
        end
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        shopping_session = user.shopping_sessions.create!(user_id: user.id, status: "active")
        NewUserMailer.with(user: user).welcome_email.deliver_later
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

    def user_admin_status
        user = find_user
        user_to_update = User.find(params[:id])
        if user.is_admin && user != user_to_update
            user_to_update.update(is_admin: params[:is_admin])
            users = User.all
            render json: users, status: :ok
        else
            render json: { errors: ["Not Authorized"]}
        end
    end

    private

    def render_not_found_response
        render json: { errors: ["User Not Found"]}, status: :not_found
    end

    def user_params
        params.permit(:username, :password, :first_name, :last_name, :email, :telephone)
    end

end
