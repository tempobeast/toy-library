class Toy < ApplicationRecord



    has_many :watch_lists
    has_many :reported_problems
    has_many :cart_items
    has_many :watching_users, through: :watch_lists, source: :user
    has_many :problem_users, through: :reported_problems, source: :user
end
