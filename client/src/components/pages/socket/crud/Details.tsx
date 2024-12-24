import React, { useState } from "react";
import { ISummaryResult, IUpdateEventDto } from "../../../../types/socket";
import { FIELD_LABELS } from "../../../../types/addNewEvent";

interface DetailsProps {
  eventDetails: ISummaryResult;
  onDelete: () => void;
  onUpdate: (updatedEvent: IUpdateEventDto) => void;
}


const Details: React.FC<DetailsProps> = ({
  eventDetails,
  onDelete,
  onUpdate,
}) => {
  const [editableFields, setEditableFields] = useState<IUpdateEventDto>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (
    field: keyof IUpdateEventDto,
    value: string | number
  ) => {
    setEditableFields({ ...editableFields, [field]: value });
  };

  const handleUpdateClick = () => {
    if (isEditing) {
      onUpdate(editableFields);
    } else {
      const initialEditableFields: IUpdateEventDto = {};
      Object.keys(FIELD_LABELS).forEach((key) => {
        const value = eventDetails[key as keyof ISummaryResult];
        //@ts-ignore
        initialEditableFields[key as keyof IUpdateEventDto] = value as
          | string
          | number
          | undefined;
      });
      setEditableFields(initialEditableFields);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto h-[400px] overflow-y-auto">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Event Details
      </h3>
      <ul className="space-y-3">
        {Object.entries(FIELD_LABELS).map(([key, label]) => {
          const value = eventDetails[key as keyof ISummaryResult];
          const isEditable = isEditing;

          return (
            <li key={key} className="flex items-center justify-between">
              <span className="font-medium text-gray-600 capitalize">
                {label}:
              </span>
              {isEditable ? (
                <input
                  type="text"
                  value={editableFields[key as keyof IUpdateEventDto] ?? value}
                  onChange={(e) =>
                    handleInputChange(
                      key as keyof IUpdateEventDto,
                      e.target.value
                    )
                  }
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm w-1/2"
                />
              ) : (
                <span className="text-gray-800">{value ?? ""}</span>
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleUpdateClick}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isEditing
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isEditing ? "Send" : "Update"}
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Details;
