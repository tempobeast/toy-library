class PreviousOrdersController < ApplicationController

    def index
        user = find_user
        if user.is_admin
            previous_orders = PreviousOrder.all
            render json: previous_orders, status: :ok
        else
            previous_orders = user.previous_orders.order(created_at: :desc)
            render json: previous_orders, status: :ok
        end
    end

    def show
        user = find_user
        if user.is_admin
            previous = PreviousOrder.find(params[:id])
            render json: previous, status: :ok
        else
            if PreviousOrder.find(params[:id]).user_id = user.id
                previous = PreviousOrder.find(params[:id])
                render json: previous, status: :ok
            end
        end
    end
    #Fix Me!! - not recognizing new columns for status update timestamps

    def update
        user = find_user
        if user.is_admin
            order = PreviousOrder.find(params[:id])
            status_change = params[:status]
            current_time = Time.now.utc
            if status_change == "shipped"
                order.update!({status: status_change, ship_date: current_time})    
            elsif status_change == "returned"
                order.update!({status: status_change, return_date: current_time})
            else status_change == "restocked"
                order.update!({status: status_change, restock_date: current_time})
                order.restock
            end
            render json: order, status: :ok
        else
            render json: { errors: ["Not Authorized"] }, status: :unauthorized
        end
    end


end
