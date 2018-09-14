class VehiclesController < ApplicationController
  def show
    @modification = Modification.find(params[:id])
  end

  def search
    # 2018 Kia Optima

  end
end