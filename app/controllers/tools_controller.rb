class ToolsController < ApplicationController
  respond_to :json

  def index
    @tools = Tool.all
  end

  def new
    @tool = Tool.new
  end

  def show
    @tool = Tool.find(params[:id])
  end

  def create
    @tool = Tool.new(params[:tool])

    if @tool.save
      redirect_to @tool, :notice => "Tool created"
    else
      render :action => :new
    end
  end

  def edit
    @tool = Tool.find(params[:id])
  end

  def update
    @tool = Tool.find(params[:id])

    if @tool.update_attributes(params[:tool])
      redirect_to @tool, :notice => 'Tool updated'
    else
      render :action => :edit
    end
  end

  def execute
    @tool = Tool.find(params[:tool_id])

    result = @tool.execute(params[:args])
    redirect_to tool_path(@tool, result: result)
  end

  def execute_remote
    runner = SageRunner.new(params[:code])
    runner.execute(params[:args])

    respond_to do |format|
      format.json { render :json => runner }
    end
  end
end
