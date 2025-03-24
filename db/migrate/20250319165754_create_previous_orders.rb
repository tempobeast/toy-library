class CreatePreviousOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :previous_orders do |t|
      t.integer :user_id
      t.integer :total
      t.string :status
      t.timestamp :ship_date
      t.timestamp :return_date
      t.timestamp :restock_date

      t.timestamps
    end
  end
end
