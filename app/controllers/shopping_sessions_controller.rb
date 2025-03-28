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

    def show
        user = find_user
        if user.is_admin
            shopping_session = ShoppingSession.find(params[:id])
            render json: shopping_session, status: :ok
        end
    end


    def update
        user = find_user
        if user.is_admin
            order = ShoppingSession.find(params[:id])
            order.update!({status: params[:status]})
            if order.status == "restocked"
                order.restock
            end
            render json: order, status: :ok
        else
            order = user.shopping_sessions.find(params[:id])
            if order.status == "active"
                new_previous_order = PreviousOrder.create!(user_id: user.id, status: "processing", total: order.total, ship_date: nil, return_date: nil, restock_date: nil)
                order.cart_items.each { |item| new_previous_order.cart_items.create(
                    shopping_session_id: order.id,
                    toy_id: item.toy_id,
                    quantity: item.quantity,
                    previous_order_id: new_previous_order,
                    )}
                order.update!(status: "inactive")
                #OrderDetailsMailer.with(user: user, order: order).details.deliver_later
                shopping_session = user.shopping_sessions.create(status: "active")
                render json: [new_previous_order, shopping_session], status: :ok
            else
                render json: {errors: ["Cannot process request until outstanding items are returned"]}, status: :unauthorized
            end
        end
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
