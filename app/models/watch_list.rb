class WatchList < ApplicationRecord

    validates_uniqueness_of :toy_id, :scope => [:user_id]

    def queue
        queue = WatchList.where(toy_id: self.toy_id)
        queue.find_index(queue.where(user_id: self.user_id).first) + 1
    end

    belongs_to :user
    belongs_to :toy
end
