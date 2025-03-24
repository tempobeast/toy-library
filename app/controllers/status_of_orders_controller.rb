class StatusOfOrdersController < ApplicationController

    def index
        orderStatusOptions = StatusOfOrder.all.pluck(:orderStatus)
        render json: orderStatusOptions, status: :ok
    end
end
