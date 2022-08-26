class Toy < ApplicationRecord



    has_many :watch_lists
    has_many :reported_problems
    has_many :cart_items
    has_many :users_with_problems, :through => :reported_problems, :source => :user
end
