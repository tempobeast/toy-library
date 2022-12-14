class SessionsController < ApplicationController

    skip_before_action :authorize, only: [:create]

    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            current_shopping_session = user.shopping_sessions.find_by(status: "active")
            render json: [user, current_shopping_session], status: :ok
        else
            render json: { errors: ["Invalid username or password"] }, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

end
