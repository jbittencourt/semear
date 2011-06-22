class CreateSeeds < ActiveRecord::Migration
  def self.up
    create_table :seeds do |t|
      t.string :word
      t.string :color
      t.string :image
      t.references :user
      t.timestamps
    end
    
    
    create_table :maps_seeds, :id=>false do |t|
      t.references :map,:seed
    end
    
    
  end

  def self.down
    drop_table :seeds
    drop_table :maps_seeds
  end
end
