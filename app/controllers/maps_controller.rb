class MapsController < ApplicationController
  
  # GET /maps/1
  def show
    @map = Map.find(params[:id])
    respond_to do |format|
       format.html # show.html.erb
       format.xml  { render :xml => @section }
    end
  end

  # GET /maps/new
  def new
    @map = Map.new
    
    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @map }
    end
  end
  
  # POST /maps
  def create
    @map = Map.new(params[:map])

    respond_to do |format|
      if @map.save
        flash[:notice] = "Map Created"
        format.html { redirect_to(:action=>'show',:id=>@map) }
        format.xml  { render :xml => @section, :status => :created, :location => @section }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @map.errors, :status => :unprocessable_entity }
      end
    end
  end
  
  def find_seed
    @map = Map.find(params[:id])
    @seed = Seed.find_or_create_by_word(params[:word])

    
    respond_to do |format|  
      response = { :seed => @seed, :index =>params[:index] }
      format.js { render :json => response.to_json  }  
    end
  end
  
  def save
    @map = Map.find(params[:id])
    @map.data = params[:map]

    respond_to do |format|  
      if @map.save
        format.js { render :json => {:message=>"Map successfully saved!"}.to_json  }
      end
    end
  end
  
end
