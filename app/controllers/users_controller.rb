class UsersController < ApplicationController

    def create
        user = User.create!(user_params)
        session[user_id] = user.id
        render json: user, status: :created
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
        permit.params(:username, :password, :first_name, :last_name, :email, :telephone)
    end
end
