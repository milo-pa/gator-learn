/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Samantha Chombo-Rodriguez 
 * Created: 11/18/25
 * Description: Component for hosting page navigation menu links.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SUBJECT_OPTIONS, COURSE_OPTIONS } from "../mock/mockOptions";
import PopUpComponent from "./PopUpComponent";


function TutorListingForm() {
  const navigate = useNavigate();
  const [showPopUp, setPopUp] = useState(false);
  const [priceValue, setPriceValue] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subject: "",
      course: "",
      pricePerHour: "",
      description: "",
      availableDays: {
        monday: { enabled: false, fromTime: "", toTime: "" },
        tuesday: { enabled: false, fromTime: "", toTime: "" },
        wednesday: { enabled: false, fromTime: "", toTime: "" },
        thursday: { enabled: false, fromTime: "", toTime: "" },
        friday: { enabled: false, fromTime: "", toTime: "" },
        saturday: { enabled: false, fromTime: "", toTime: "" },
        sunday: { enabled: false, fromTime: "", toTime: "" },
      },
      resumeFile: null,
      profileImage: null,
      videoSample: null,
    },
  });
  const priceReg = register("pricePerHour", {
    required: "Price required",
  });

  const availableDays = watch("availableDays");
  const subject = watch("subject");

  const selectedSubject = SUBJECT_OPTIONS.find((s) => s.name === subject);

  const filteredCourses = useMemo(() => {
    if (!selectedSubject) return [];
    return COURSE_OPTIONS.filter((c) => c.subjectId === selectedSubject.id);
  }, [selectedSubject]);

  const onSubmit = (data) => {
    console.log("Tutor listing form submitted (mock):", data);
    setPopUp(true);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (value === "" || regex.test(value)) {
      setPriceValue(value);
    }
  };

  const handleBlur = () => {
    if (priceValue === "") return;
    let formattedPrice = parseFloat(priceValue).toFixed(2);
    setPriceValue(formattedPrice);
  };

  return (
    // Title in pages folder
    <>
      <main className="form-main">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>

          <div className="form-row">
            <label className="required-label" htmlFor="subject">Subject:</label>
            <select
              id="subject"
              className={`input-wrapper ${errors.subject ? "input-error" : ""}`}
              {...register("subject", { required: "Subject is required" })}
            >
              <option value="">Select a subject</option>
              {SUBJECT_OPTIONS.map((s) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>
          {errors.subject && (
            <p className="form-error">{errors.subject.message}</p>
          )}


          <div className="form-row">
            <label className="required-label" htmlFor="course">Course:</label>
            <select
              id="course"
              className={`input-wrapper ${errors.course ? "input-error" : ""}`}
              disabled={!subject}
              {...register("course", {
                required: subject ? "Course is required" : false,
              })}
            >
              <option value="">
                {subject ? "Select class" : "Choose subject first"}
              </option>
              {filteredCourses.map((c) => (
                <option key={c.id} value={c.code}>
                  {c.code} {c.name}
                </option>
              ))}
            </select>
          </div>
          {errors.course && (
            <p className="form-error">{errors.course.message}</p>
          )}

          <div className="form-row">
            <label className="required-label" htmlFor="pricePerHour">Price per hour: $</label>
            <div className={`input-wrapper small-input-wrapper${errors.pricePerHour ? "input-error" : ""}`}>
              <input
                id="pricePerHour"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={priceValue}
                {...priceReg}
                onChange={(e) => {
                  priceReg.onChange(e);
                  handlePriceChange(e);
                }}
                onBlur={(e) => {
                  priceReg.onBlur(e);
                  handleBlur();
                }}
              />
            </div>
          </div>
          {errors.pricePerHour && (
            <p className="form-error">{errors.pricePerHour.message}</p>
          )}

          <div className="form-row description-area">
            <label htmlFor="description">Description:</label>
            <div className="input-wrapper textarea-wrapper">
              <textarea
                id="description"
                rows="5"
                {...register("description")}
              />
            </div>
          </div>

          <div className="form-row">
            <label className="required-label">Availablity: </label>
            <div className="availability-block">
              <div className="days-column">
                {[
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                  "sunday",
                ].map((day) => {
                  const label = day.charAt(0).toUpperCase() + day.slice(1);
                  const dayData = availableDays?.[day] || {};

                  return (
                    <div key={day} className="day-row">
                      <label className="day-checkbox">
                        <input
                          type="checkbox"
                          {...register(`availableDays.${day}.enabled`)}
                        />
                        <span>{label}</span>
                      </label>

                      {dayData.enabled && (
                        <div className="day-time-range">
                          <span className="time-label">From:</span>
                          <input
                            type="time"
                            className="time-input"
                            {...register(`availableDays.${day}.fromTime`)}
                          />
                          <span className="time-label">To:</span>
                          <input
                            type="time"
                            className="time-input"
                            {...register(`availableDays.${day}.toTime`)}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>


          <div className="form-row">
            <label htmlFor="resume-file">Resume/CV:</label>
            <div className={"input-wrapper"}>
              <input
                type="file"
                id="resume-file"
                accept=".pdf, .jpg,.jpeg, .webp"
                {...register("resume-file")}
              />
            </div>

            <span className="hci-text desc-text">
              Allows JPG, PNG, and WEBP
            </span>
          </div>

          <div className="form-row">
            <label htmlFor="sample-file">Sample Video:</label>
            <div className={"input-wrapper"}>
              <input
                type="file"
                id="sample-file"
                accept="video/mp4, video/mov, video/webm"
                {...register("sample-file", {
                  required: "Sample video is required",
                  validate: {
                    isVideo: (files) => 
                      files?.[0]?.type.startsWith("video/") || "only video files are allowed",
                  },


                })}
              />
            </div>

            <span className="hci-text desc-text">
              Allows MOV, MP4, and WEBM
            </span>
          </div>

          <div className="button-row ">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              CANCEL
            </button>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
              SUBMIT
            </button>
          </div>


        </form>

      </main>



      {showPopUp && (
        <PopUpComponent
          title="Thank you for submitting your listing"
          onClose={() => setPopUp(false)}
        >
          <p>
            Please wait 24 to 48 hours for approval message in your dashboard
            inbox
          </p>
        </PopUpComponent>
      )}
    </>
  );
}

export default TutorListingForm;
