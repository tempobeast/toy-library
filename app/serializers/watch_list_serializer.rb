class WatchListSerializer < ActiveModel::Serializer
  attributes :id, :queue, :toy

  belongs_to :toy
end
