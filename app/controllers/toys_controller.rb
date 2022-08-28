class ToysController < ApplicationController

    skip_before_action :authorize, only: :index

    def index
        toys = Toy.all
        render json: toys, status: :ok
    end

    def create
        toy = Toy.create!(toy_params)
        render json: toy, status: :created
    end

    private

    def toy_params
        params.permit(:name, :description, :sku, :purchase_price, :inventory, :age_range, :img_url)
    end

end

