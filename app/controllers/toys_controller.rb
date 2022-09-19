class ToysController < ApplicationController

    skip_before_action :authorize, only: [:index, :show]

    def index
        toys = Toy.all
        render json: toys, status: :ok
    end

    def create
        user = find_user
        if user.is_admin
            toy = Toy.create!(toy_params)
            render json: toy, status: :created
        else
            render json: { errors: ["Unauthorized"]}
        end
    end

    def show
        toy = Toy.find(params[:id])
        render json: toy, status: :ok
    end

    private

    def toy_params
        params.permit(:name, :description, :sku, :purchase_price, :inventory, :age_range, :img_url)
    end

end

