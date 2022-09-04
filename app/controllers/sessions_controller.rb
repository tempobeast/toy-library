class SessionsController < ApplicationController

    skip_before_action :authorize, only: [:create]

    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            # if user.shopping_session == false
            #     user.shopping_session.create(total: 0)
            # end
            current_shopping_session = user.shopping_sessions.find_by(status: "active")
            render json: {user: user, cart: current_shopping_session} , status: :ok
        else
            render json: { errors: ["Invalid username or password"] }, status: :unauthorized
        end
        byebug
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

end

            # if session[:shopping_session] == false
            #     shop_sesh = ShoppingSession.create(user_id = user.id)
            #     session[:shopping_session] = shop_sesh.id
            # else 
            #     shop_sesh = user.shopping_sessions.last_name
            #     session[:shopping_session] = shop_sesh.id
            # end 