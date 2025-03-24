class CreatePolyReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :poly_reviews do |t|
      t.integer :stars
      t.references :reviewable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
