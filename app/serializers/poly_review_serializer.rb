class PolyReviewSerializer < ActiveModel::Serializer
  attributes :id, :stars, :user_id
  
  has_one :reviewable
end
