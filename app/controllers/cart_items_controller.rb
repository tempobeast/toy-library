class CartItemsController < ApplicationController

    def create
        user = find_user
        current_shopping_session = user.shopping_sessions.where(status: "active")
        current_shopping_session.cart_items.create(cart_item_params)
        cart_item.update_inventory
        toy = cart_item.toy
        shop_sesh = cart_item.shopping_session
        render json: [shop_sesh, toy], status: :ok
    end

    private

    def cart_item_params
        params.permit(:toy_id, :quantity)
    end

end
