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
import "../styles/tutor-listing-form.scss";

function TutorListingForm() {
  const navigate = useNavigate();
  const [showPopUp, setPopUp] = useState(false);

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

  return (
    <>
      <form className="tutor-listing-form" onSubmit={handleSubmit(onSubmit)}>


        <div className="row-subject">
          <label className="label-subject" htmlFor="subject">For:</label>
          <select
            id="subject"
            className="input-subject"
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


        <div className="row-course">
  <label className="label-course" htmlFor="course">Course:</label>
  <select
    id="course"
    className="input-course"
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


        <div className="row-price">
  <label className="label-price" htmlFor="pricePerHour">Price per hour:</label>
  <input
    id="pricePerHour"
    type="number"
    className="input-price"
    {...register("pricePerHour", { required: "Price required" })}
  />
  <span className="price-unit">$/hr</span>
</div>

        {errors.pricePerHour && (
          <p className="form-error">{errors.pricePerHour.message}</p>
        )}


        <div className="row-description">
  <label className="label-description" htmlFor="description">Description:</label>
  <textarea
    id="description"
    className="input-description"
    rows="5"
    placeholder="Brag and describe yourself"
    {...register("description", { required: "Description required" })}
  />
</div>
        {errors.description && (
          <p className="form-error">{errors.description.message}</p>
        )}


        <div className="row-availability">
          <span className="label-availability">Availability:</span>
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

        <div className="row-optional">
          <span className="label-optional">Optional:</span>
          <div className="optional-block">
            <div className="optional-item">
              <span className="optional-label">Attach Resume/CV:</span>
              <label className="file-button">
                Attach File
                <input
                  type="file"
                  {...register("resumeFile")}
                  accept=".pdf,.jpg,.jpeg,.webp"
                />
              </label>
              <p className="optional-hint">Accepts JPEG, PDF, WEBP</p>
            </div>

            <div className="optional-item">
              <span className="optional-label">Attach Profile Image:</span>
              <label className="file-button">
                Attach File
                <input
                  type="file"
                  {...register("profileImage")}
                  accept=".png,.jpg,.jpeg,.webp"
                />
              </label>
              <p className="optional-hint">Accepts JPEG, PNG, WEBP</p>
            </div>

            <div className="optional-item">
              <span className="optional-label">Attach Tutoring Video Sample:</span>
              <label className="file-button">
                Attach File
                <input
                  type="file"
                  {...register("videoSample")}
                  accept=".mp4,.mov"
                />
              </label>
              <p className="optional-hint">Accepts MOV, MP4</p>
            </div>
          </div>
        </div>

        <div className="form-submit-row">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(-1)}
          >
            CANCEL
          </button>
          <button type="submit" className="btn-submit">
            SUBMIT
          </button>
        </div>
      </form>

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
