/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import { Datepicker, Radio } from "flowbite-react";
import { useState, ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { addCarFormData } from "../../utils/FormCars";
import { addCarFormSchema } from "../../utils/CarValidator";
import { useCarContext } from "../../contexts/CarContext";

const AddCar: React.FC = () => {
  const [optionsField, setOptionsField] = useState<string[]>([""]);
  const [specsField, setSpecsField] = useState<string[]>([""]);
  const [image, setImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addCar } = useCarContext();

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { isSubmitted, errors },
  } = useForm<addCarFormData>({
    resolver: yupResolver(addCarFormSchema) as any,
  });

  const handleChangeOptionsInput = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newOptionsField = [...optionsField];
    newOptionsField[index] = e.target.value;
    setOptionsField(newOptionsField);
    setValue(`options.${index}`, e.target.value);
  };

  const handleChangeSpecsInput = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newSpecsField = [...specsField];
    newSpecsField[index] = e.target.value;
    setSpecsField(newSpecsField);
    setValue(`specs.${index}`, e.target.value);
  };

  const handleAddOptionsInput = () => {
    setOptionsField([...optionsField, ""]);
    setValue("options", [...optionsField, ""]);
  };

  const handleAddSpecsInput = () => {
    setSpecsField([...specsField, ""]);
    setValue("specs", [...specsField, ""]);
  };

  const handleRemoveOptionsInput = () => {
    const newOptionsField = [...optionsField];
    newOptionsField.pop();
    setOptionsField(newOptionsField);
  };

  const handleRemoveSpecsInput = () => {
    const newSpecsField = [...specsField];
    newSpecsField.pop();
    setSpecsField(newSpecsField);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImage(reader.result as string);
      });
      reader.readAsDataURL(file);
    }
  };
  const handleClearImage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setImage(null);
    const fileInput = document.getElementById("imageInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmitHandler = async (data: addCarFormData) => {
    try {
      await addCar(data);
      navigate("/admin/cars");
    } catch (error) {
      console.error("An error occurred during adding car:", error);
    }
  };
  return (
    <>
      <div className="flex flex-row space-x-2 mt-5 md:ml-8">
        <p className="font-bold">Cars</p>
        <i data-feather="chevron-right"></i>
        <p className="text-[#222222] font-bold">List Car</p>
        <i data-feather="chevron-right"></i>
        <p className="text-[#222222]">Add New Car</p>
      </div>
      <section id="addNewCar">
        <div className="flex mt-10 md:ml-8">
          <h1 className="font-bold text-xl">Add New Car</h1>
        </div>
        <div className="flex flex-col md:mx-8 mt-5 md:w-11/12 w-10/12 h-auto md:py-5 md:px-5 bg-white rounded-sm">
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex flex-col md:gap-5 gap-1 w-full h-full"
          >
            <div className="flex md:flex-row flex-col">
              <div className="w-1/6">
                <label className="flex items-center">
                  Plate <p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="md:w-[339px] md:h-[36px] rounded-sm border border-[#D0D0D0]"
                  {...register("plate")}
                />
                {isSubmitted && errors.plate && (
                  <span className="text-red-500">{errors.plate.message}</span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="w-1/6">
                <label className="flex items-center">
                  Manufacture <p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="md:w-[339px] md:h-[36px] rounded-sm border border-[#D0D0D0]"
                  {...register("manufacture")}
                />
                {isSubmitted && errors.manufacture && (
                  <span className="text-red-500">
                    {errors.manufacture.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="w-1/6">
                <label className="flex items-center">
                  Model <p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="md:w-[339px] md:h-[36px] rounded-sm border border-[#D0D0D0]"
                  {...register("model")}
                />
                {isSubmitted && errors.model && (
                  <span className="text-red-500">{errors.model.message}</span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="w-2/5 md:w-1/6">
                <label className="flex items-center">
                  Rent Per Day <p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="flex flex-col">
                <input
                  type="number"
                  className="md:w-[339px] md:h-[36px] rounded-sm border border-[#D0D0D0]"
                  {...register("rent_per_day")}
                />
                {isSubmitted && errors.rent_per_day && (
                  <span className="text-red-500">
                    {errors.rent_per_day.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="w-1/6">
                <label className="flex items-center">
                  Capacity <p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="flex flex-col">
                <input
                  type="number"
                  className="md:w-[339px] md:h-[36px] rounded-sm border border-[#D0D0D0]"
                  {...register("capacity")}
                />
                {isSubmitted && errors.capacity && (
                  <span className="text-red-500">
                    {errors.capacity.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="w-1/6">
                <label className="flex items-center">
                  Description <p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="flex flex-col">
                <textarea
                  id="message"
                  rows={4}
                  className="md:w-[339px] md:h-[50px] rounded-sm border border-[#D0D0D0]"
                  {...register("description")}
                />
                {isSubmitted && errors.description && (
                  <span className="text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="w-2/5 md:w-1/6">
                <label className="flex items-center">
                  Available at <p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="flex flex-col">
                <Controller
                  name="available_at"
                  control={control}
                  render={({ field }) => (
                    <Datepicker
                      className="md:w-[339px] md:h-[36px]"
                      onSelectedDateChanged={(date) =>
                        field.onChange(date.toString())
                      }
                    />
                  )}
                />
                {isSubmitted && errors.available_at && (
                  <span className="text-red-500">
                    {errors.available_at.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="w-1/6">
                <label className="flex items-center">
                  Transmission<p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="flex flex-col">
                <div className="flex space-x-5 md:w-[339px] md:h-[36px]">
                  <Controller
                    name="transmission"
                    control={control}
                    render={({ field }) => (
                      <>
                        <div className="flex items-center gap-2">
                          <Radio id="manual" {...field} value="manual" />
                          <label htmlFor="manual">Manual</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio id="automatic" {...field} value="automatic" />
                          <label htmlFor="automatic">Automatic</label>
                        </div>
                      </>
                    )}
                  />
                </div>
                {isSubmitted && errors.transmission && (
                  <span className="text-red-500">
                    {errors.transmission.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="w-1/6">
                <label className="flex items-center">
                  Available<p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="flex flex-col">
                <div className="flex space-x-5 md:w-[339px] md:h-[36px]">
                  <Controller
                    name="available"
                    control={control}
                    render={({ field }) => (
                      <>
                        <div className="flex items-center gap-2">
                          <Radio id="true" {...field} value="true" />
                          <label htmlFor="true">True</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Radio id="false" {...field} value="false" />
                          <label htmlFor="false">False</label>
                        </div>
                      </>
                    )}
                  />
                </div>
                {isSubmitted && errors.available && (
                  <span className="text-red-500">
                    {errors.available.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="w-1/6">
                <label className="flex items-center">
                  Type <p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="md:w-[339px] md:h-[36px] rounded-sm border border-[#D0D0D0]"
                  {...register("type")}
                />
                {isSubmitted && errors.type && (
                  <span className="text-red-500">{errors.type.message}</span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="w-1/6">
                <label className="flex items-center">
                  Year <p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="flex flex-col">
                <input
                  type="number"
                  className="md:w-[339px] md:h-[36px] rounded-sm border border-[#D0D0D0]"
                  {...register("year")}
                />
                {isSubmitted && errors.year && (
                  <span className="text-red-500">{errors.year.message}</span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="w-1/6">
                <label className="flex items-center">
                  Options <p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="flex flex-col space-y-2">
                {optionsField.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="md:w-[339px] md:h-[36px] rounded-sm border border-[#D0D0D0]"
                      {...register(`options.${index}`)}
                      value={option}
                      onChange={(e) => handleChangeOptionsInput(index, e)}
                    />
                    <button
                      type="button"
                      onClick={handleAddOptionsInput}
                      className="flex items-center"
                    >
                      <i
                        data-feather="plus-circle"
                        className="mt-2 text-gray-400 hover:text-blue-500"
                      />
                    </button>
                    <button
                      type="button"
                      disabled={optionsField.length === 1}
                      onClick={handleRemoveOptionsInput}
                      className="flex items-center"
                    >
                      <i
                        data-feather="x-circle"
                        className="mt-2 text-gray-400 hover:text-red-500"
                      />
                    </button>
                  </div>
                ))}
                {isSubmitted && errors.options && (
                  <span className="text-red-500">{errors.options.message}</span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="w-1/6">
                <label className="flex items-center">
                  Specs <p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="flex flex-col space-y-2">
                {specsField.map((spec, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="md:w-[339px] md:h-[36px] rounded-sm border border-[#D0D0D0]"
                      {...register(`specs.${index}`)}
                      value={spec}
                      onChange={(e) => handleChangeSpecsInput(index, e)}
                    />
                    <button
                      type="button"
                      onClick={handleAddSpecsInput}
                      className="flex items-center"
                    >
                      <i
                        data-feather="plus-circle"
                        className="mt-2 text-gray-400 hover:text-blue-500"
                      />
                    </button>
                    <button
                      type="button"
                      disabled={specsField.length === 1}
                      onClick={handleRemoveSpecsInput}
                      className="flex items-center"
                    >
                      <i
                        data-feather="x-circle"
                        className="mt-2 text-gray-400 hover:text-red-500"
                      />
                    </button>
                  </div>
                ))}
                {isSubmitted && errors.specs && (
                  <span className="text-red-500">{errors.specs.message}</span>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="w-1/6">
                <label className="flex items-center">
                  Foto <p className="text-[#FA2C5A]">*</p>
                </label>
              </div>
              <div className="md:flex md:space-x-3">
                <div className="flex flex-col">
                  <input
                    id="image"
                    type="file"
                    {...register("image")}
                    className="md:w-[339px] md:h-[36px] border border-[#D0D0D0] rounded-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                    file:bg-gray-50 file:border-0
                    file:me-4
                    file:py-2 file:px-4 file:text-xs
                    dark:file:bg-neutral-700 dark:file:text-neutral-400"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <p className="text-[#8A8A8A]">File size max. 2MB</p>
                  {errors.image && (
                    <span className="text-red-500">{errors.image.message}</span>
                  )}
                  {image && <img src={image} alt="preview" width={200} />}
                </div>
                <button
                  onClick={handleClearImage}
                  className="mt-1 items-center justify-center w-[100px] h-[30px] border border-gray-500 hover:border-blue-500 hover:text-blue-500 rounded-sm text-gray-500"
                >
                  Clear Image
                </button>
              </div>
            </div>
            <div className="flex flex-row md:space-x-5 space-x-1 mt-5 md:ml-8">
              <Link to="/admin/cars">
                <button
                  type="button"
                  className="items-center justify-center md:w-[144px] md:h-[48px] w-[80px] h-[40px] border border-[#0D28A6] rounded-sm"
                >
                  <p className="text-[#0D28A6] font-bold">Cancel</p>
                </button>
              </Link>
              <button
                type="submit"
                className="items-center justify-center md:w-[144px] md:h-[48px] w-[80px] h-[40px] border bg-[#0D28A6] rounded-sm"
              >
                <p className="text-white font-bold">Save</p>
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddCar;
