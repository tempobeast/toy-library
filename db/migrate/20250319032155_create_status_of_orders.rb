class CreateStatusOfOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :status_of_orders do |t|
      t.string :orderStatus

      t.timestamps
    end
  end
end
