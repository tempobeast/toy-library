class ToysController < ApplicationController

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
        permit.params(:name, :description, :sku, :purchase_price, :inventory, :age_range)
    end

end

