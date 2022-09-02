class WatchList < ApplicationRecord

    def queue
        queue = WatchList.where(toy_id: self.toy_id)
        queue.find_index(queue.where(user_id: self.user_id).first)
    end

    belongs_to :user
    belongs_to :toy
end
