class AddUserIdToPolyReview < ActiveRecord::Migration[7.0]
  def change

    add_column :poly_reviews, :user_id, :integer
  end
end
