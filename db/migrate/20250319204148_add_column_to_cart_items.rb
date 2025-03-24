class AddColumnToCartItems < ActiveRecord::Migration[7.0]
  def change
    add_column :cart_items, :previous_order_id, :integer
  end
end
