class CreateToys < ActiveRecord::Migration[7.0]
  def change
    create_table :toys do |t|
      t.string :name
      t.text :description
      t.integer :sku
      t.integer :purchase_price
      t.integer :inventory
      t.string :age_range

      t.timestamps
    end
  end
end
