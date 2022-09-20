class ShoppingSessionsController < ApplicationController

    def index
        user = find_user
        if user.is_admin
            shopping_sessions = ShoppingSession.all.where.not(status: "active")
            render json: shopping_sessions, status: :ok
        else
            shopping_sessions = user.shopping_sessions.where.not(status: "active").order(created_at: :desc)
            render json: shopping_sessions, status: :ok
        end
    end

    def update
        user = find_user
        order = user.shopping_sessions.find(params[:id])
        if order.status == "active"
            order.update!(status: params[:status])
            OrderDetailsMailer.with(user: user, order: order).details.deliver_later
            shopping_session = user.shopping_sessions.create(status: "active")
        else
            order.update!(status: params[:status])
        end
        render json: [order, shopping_session], status: :ok
    end

    def cancel
        user = find_user
        shopping_session = user.shopping_sessions.find_by(status: "active")
        shopping_session.restock
        shopping_session.cart_items.destroy_all
        toys = Toy.all
        render json: toys, status: :ok
    end


    private

    def cart_item_params
        params.permit(:toy_id, :quantity, :status)
    end
end
