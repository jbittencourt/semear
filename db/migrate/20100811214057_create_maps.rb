class CreateMaps < ActiveRecord::Migration
  def self.up
    create_table :maps do |t|
      t.string :question, :null=>false
      t.binary :data
      t.integer :editor_id
      t.integer :version, :default=>1
      t.timestamps
    end
    
    create_table :map_versions do |t|
      t.references :map, :user
      t.integer :version
      t.string  :question
      t.text    :data
      t.timestamps
    end
    
    create_table :maps_users, :id=>false do |t|
      t.references :map, :user
    end
    
  end

  def self.down
    drop_table :maps
  end
end
