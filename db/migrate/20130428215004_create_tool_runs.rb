class CreateToolRuns < ActiveRecord::Migration
  def change
    create_table :tool_runs do |t|
      t.integer :tool_id

      t.timestamps
    end
  end
end
