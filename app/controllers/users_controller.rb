class UsersController < ApplicationController

    skip_before_action :authorize, only: :create

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :ok
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: { errors: ["Not Authorized"] }, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:username, :password, :first_name, :last_name, :email, :telephone)
    end

end
