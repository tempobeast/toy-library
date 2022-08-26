class CreateReportedProblems < ActiveRecord::Migration[7.0]
  def change
    create_table :reported_problems do |t|
      t.integer :user_id
      t.integer :toy_id
      t.string :problem_type
      t.text :description

      t.timestamps
    end
  end
end
