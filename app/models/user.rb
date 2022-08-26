class User < ApplicationRecord


    has_one :user_payment_method
    has_one :user_address
    has_many :reported_problems
    has_many :watch_lists
    has_many :shopping_sessions
    has_many :watch_list_toys, through: :watch_lists, source: :toy
    has_many :problem_toys, through: :reported_problems, source: :toy

end
