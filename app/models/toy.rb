class Toy < ApplicationRecord


    def review_average 
        count = self.poly_reviews.length
        total_stars = self.poly_reviews.sum(:stars).to_f
        avg = 0
        if count > 0
            avg = total_stars / count
        end
        avg.round(1)
    end

    has_many :users, through: :poly_reviews
    has_many :poly_reviews, as: :reviewable
    has_many :watch_lists
    has_many :cart_items
    has_many :watching_users, through: :watch_lists, source: :user
end
