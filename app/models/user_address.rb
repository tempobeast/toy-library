class UserAddress < ApplicationRecord

    #validates that address exists

    belongs_to :user
end
