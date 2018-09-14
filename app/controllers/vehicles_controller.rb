class VehiclesController < ApplicationController
  def show
    @modification = Modification.find(params[:id])
  end

  def search
    # Kia Optima
    year, search = params[:q].split(" ", 2)
    return render json: [] unless year.present? && search.present?

    render json: Modification.with_joins.select(
        :id, "concat_ws(' ', brands.name, models.name, engine) as full_description"
    ).where(["year_start <= ? or year_start is null", year.to_i])
     .where(["year_stop >= ? or year_stop is null", year.to_i])
     .where(["concat_ws(' ', brands.name, models.name, engine) ilike ?", "#{search}%"])
  end
end