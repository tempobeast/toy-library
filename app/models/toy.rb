class Toy < ApplicationRecord

    has_many :watch_lists
    has_many :cart_items
    has_many :watching_users, through: :watch_lists, source: :user
end
