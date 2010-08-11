class CreateSeeds < ActiveRecord::Migration
  def self.up
    create_table :seeds do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :seeds
  end
end
