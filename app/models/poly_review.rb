class PolyReview < ApplicationRecord
  belongs_to :reviewable, polymorphic: true
  belongs_to :user

  validates :stars, presence: true, :numericality => {greater_than: 0, less_than: 6, message: "out of range"}

end
