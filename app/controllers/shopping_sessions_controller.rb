class ShoppingSessionsController < ApplicationController

    def create
        shopping_session = ShoppingSession.create(user_id: session[:user_id])
        shopping_session.cart_items.create(cart_item_params)
        render json: shopping_session, status: :ok
    end

    private

    def cart_item_params
        params.permit(:toy_id, :quantity)
    end
end
