# class Order < ApplicationRecord

#     # def move_shopping_session

#     # end

#     # def total_price
#     #     self.order_items.sum {|item| item.quantity * item.toy.purchase_price}
#     # end

#     # def total_items
#     #     self.order_items.sum {|item| item.quantity}
#     # end

#     belongs_to :user
#     has_many :order_items
#     has_many :toys, through: :order_items
# end
