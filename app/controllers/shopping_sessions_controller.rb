class ShoppingSessionsController < ApplicationController

    # def create
    #     current_shopping_session = ShoppingSession.create(user_id: params[:user_id], status: "active")
    #     render json: shopping_session, status: :ok
    # end

    def index
        user = find_user
        shopping_sessions = user.shopping_sessions.where.not(status: "active").order(created_at: :desc)
        render json: shopping_sessions, status: :ok
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
        shopping_session = user.shopping_sessions.find_by(status: "active").cart_items.destroy_all
        render json: shopping_session, status: :ok
    end


    private

    def cart_item_params
        params.permit(:toy_id, :quantity, :status)
    end
end
