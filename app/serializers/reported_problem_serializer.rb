class ReportedProblemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :toy_id, :problem_type, :description
end
