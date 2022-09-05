class ShoppingSessionsController < ApplicationController

    # def create
    #     current_shopping_session = ShoppingSession.create(user_id: params[:user_id], status: "active")
    #     render json: shopping_session, status: :ok
    # end

    def index
        user = find_user
        shopping_sessions = user.shopping_sessions.where.not(status: "active")
        render json: shopping_sessions, status: :ok
    end


    private

    def cart_item_params
        params.permit(:toy_id, :quantity, :status)
    end
end
