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
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PopUpComponent from "./PopUpComponent";
import tutorListingService from "../service/tutorListingService";
import { cleanText, cleanFreeText } from "../util/sanitize";
import { useAuth } from "./AuthContext";

function TutorListingForm() {
    const navigate = useNavigate();
    const [showPopUp, setPopUp] = useState(false);
    const [priceValue, setPriceValue] = useState("");
    const { user } = useAuth();
    const [subjects, setSubjects] = useState([]);
    const [courses, setCourses] = useState([]);

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

    const subjectId = subject ? Number(subject) : 0;

    useEffect(() => {
        tutorListingService
            .getAllSubjects()
            .then((res) => {
                console.log("SUBJECTS STATUS:", res.status);
                console.log("SUBJECTS DATA:", res.data);
                setSubjects(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.log("GET SUBJECTS ERROR:", err);
                console.log("STATUS:", err.response?.status);
                console.log("DATA:", err.response?.data);
            });
    }, []);

    useEffect(() => {
        if (!subjectId) {
            setCourses([]);
            return;
        }

        tutorListingService
            .getCoursesBySubjectId(subjectId)
            .then((res) => setCourses(res.data || []))
            .catch((err) => console.log("GET COURSES ERROR:", err));
    }, [subjectId]);
    const filteredCourses = useMemo(() => courses, [courses]);

    // blatantly ai generated function
    function formatAvailableDays(availableDays) {
        const days = [
            ["monday", "Mon"],
            ["tuesday", "Tue"],
            ["wednesday", "Wed"],
            ["thursday", "Thu"],
            ["friday", "Fri"],
            ["saturday", "Sat"],
            ["sunday", "Sun"],
        ];

        const to12Hour = (time) => {
            const [h, m] = time.split(":").map(Number);
            const hour = h % 12 || 12;
            const suffix = h < 12 ? "AM" : "PM";
            return `${hour}:${String(m).padStart(2, "0")}${suffix}`;
        };

        return days
            .filter(([key]) => availableDays[key]?.enabled)
            .map(([key, label]) => {
                const { fromTime, toTime } = availableDays[key];
                return `${label} ${to12Hour(fromTime)}-${to12Hour(toTime)}`;
            })
            .join(", ");
    }

    console.log("AUTH USER:", user);
    console.log("AUTH USER ID:", user?.userId);
    const onSubmit = (data) => {
        if (!user?.userId) {
            alert("User not loaded yet. Please wait a moment.");
            return;
        }
        const payload = {
            account: { userId: user.userId },               // maps to user_id
            subject: { subjectId: Number(data.subject) },   // maps to subject_id
            course: { courseId: Number(data.course) },      // maps to course_id

            pricePerHour: Number(priceValue || 0),
            live: 1,                                        // IMPORTANT (int)
            description: cleanFreeText(data.description || ""),
            availableTime: formatAvailableDays(data.availableDays) || "",

            resumePath: data.resumeFile?.[0]?.name ?? "",   // IMPORTANT (not null)
            videoSamplePath: data.videoSample?.[0]?.name ?? null,
        };

        console.log("FORM DATA:", data);

        console.log("PAYLOAD (CLEANED):", payload);

        tutorListingService
            .createListing(payload)
            .then(() => setPopUp(true))
            .catch((err) => {
                const data = err.response?.data;
                console.log("CREATE LISTING ERROR:", data);
                alert(
                    "Listing creation failed: " +
                    (typeof data === "string" ? data : JSON.stringify(data, null, 2))
                );
            });
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

    const hasAnyDaySelected = Object.values(availableDays || {}).some((d) => d?.enabled);

    return (
        // Title in pages folder
        <>
            <main className="form-main">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <label className="required-label" htmlFor="subject">
                            Subject:
                        </label>
                        <select
                            id="subject"
                            className={`input-wrapper ${errors.subject ? "input-error" : ""}`}
                            {...register("subject", { required: "Subject is required" })}
                        >
                            <option value="">Select a subject</option>
                            {subjects.map((s) => (
                                <option key={s.subjectId} value={s.subjectId}>
                                    {s.subjectName}
                                </option>
                            ))}
                        </select>

                        {errors.subject && <div className="error-text desc-text">{errors.subject.message}</div>}
                    </div>

                    <div className="form-row">
                        <label className="required-label" htmlFor="course">
                            Course:
                        </label>
                        <select
                            id="course"
                            className={`input-wrapper ${errors.course ? "input-error" : ""}`}
                            disabled={!subjectId}
                            {...register("course", {
                                required: subject ? "Course is required" : false,
                            })}
                        >
                            <option value="">{subject ? "Select class" : "Choose subject first"}</option>
                            {filteredCourses.map((c) => (
                                <option key={c.courseId} value={c.courseId}>
                                    {c.courseNumber} {c.courseName}
                                </option>
                            ))}
                        </select>
                        {errors.course && <div className="error-text desc-text">{errors.course.message}</div>}
                    </div>

                    <div className="form-row">
                        <label className="required-label" htmlFor="pricePerHour">
                            Price per hour: $
                        </label>
                        <div
                            className={`input-wrapper small-input-wrapper ${errors.pricePerHour ? "input-error" : ""}`}
                        >
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
                        {errors.pricePerHour && (
                            <div className="error-text desc-text">{errors.pricePerHour.message}</div>
                        )}
                    </div>

                    <div className="form-row description-area">
                        <label htmlFor="description">Description:</label>
                        <div className="input-wrapper textarea-wrapper">
                            <textarea id="description" rows="5" {...register("description")} />
                        </div>
                    </div>
                    <input
                        type="hidden"
                        {...register("availableDays", {
                            required: "Please select at least one available day",
                            validate: () => hasAnyDaySelected || "Please select at least one available day",
                        })}
                    />
                    <div className="form-row">
                        <label className="required-label">Availablity: </label>
                        <div
                            className={`availability-block ${errors.availableDays && !hasAnyDaySelected ? "input-error" : ""
                                }`}
                        >
                            <div className="days-column">
                                {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map(
                                    (day) => {
                                        const label = day.charAt(0).toUpperCase() + day.slice(1);
                                        const dayData = availableDays?.[day] || {};
                                        const fromError = errors?.availableDays?.[day]?.fromTime;
                                        const toError = errors?.availableDays?.[day]?.toTime;
                                        const hasTimeError = !!(fromError || toError);

                                        return (
                                            <div key={day} className={`day-row ${hasTimeError ? "input-error" : ""}`}>
                                                <label className="day-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        {...register(`availableDays.${day}.enabled`)}
                                                    />
                                                    <span>{label}</span>
                                                </label>

                                                {dayData.enabled && (
                                                    <>
                                                        <div className="day-time-range">
                                                            <span className="time-label">From:</span>
                                                            <input
                                                                type="time"
                                                                className={`time-input ${fromError ? "input-error" : ""
                                                                    }`}
                                                                {...register(`availableDays.${day}.fromTime`, {
                                                                    required: "Start time required",
                                                                })}
                                                            />
                                                            <span className="time-label">To:</span>
                                                            <input
                                                                type="time"
                                                                className={`time-input ${toError ? "input-error" : ""}`}
                                                                {...register(`availableDays.${day}.toTime`, {
                                                                    required: "End time required",
                                                                })}
                                                            />
                                                        </div>
                                                        {(fromError || toError) && (
                                                            <div className="error-text day-error-text">
                                                                {fromError?.message || toError?.message}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                        {errors.availableDays && !hasAnyDaySelected && (
                            <div className="error-text desc-text">{errors.availableDays.message}</div>
                        )}
                    </div>

                    <div className="form-row">
                        <label htmlFor="resumeFile">Resume/CV:</label>
                        <div className={"input-wrapper"}>
                            <input
                                type="file"
                                id="resumeFile"
                                accept=".pdf, .jpg,.jpeg, .webp"
                                {...register("resumeFile")}
                            />
                        </div>

                        <span className="hci-text desc-text">Allows JPG, PNG, and WEBP</span>
                    </div>

                    <div className="form-row">
                        <label htmlFor="videoSample">Sample Video:</label>
                        <div className={"input-wrapper"}>
                            <input
                                type="file"
                                id="videoSample"
                                accept="video/mp4, video/webm"
                                {...register("videoSample", {
                                    validate: {
                                        isVideo: (files) => {
                                            if (!files || files.length === 0) return true; // no file = ok (optional)
                                            return (
                                                files[0].type?.startsWith("video/") || "only video files are allowed"
                                            );
                                        },
                                    },
                                })}
                            />
                        </div>

                        <span className="hci-text desc-text">Allows MP4, and WEBM</span>
                    </div>

                    <div className="button-row ">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                            CANCEL
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={!user?.userId}>
                            SUBMIT
                        </button>
                    </div>
                </form>
            </main>

            {showPopUp && (
                <PopUpComponent title="Thank you for submitting your listing" onClose={() => setPopUp(false)}>
                    <p>Please wait 24 to 48 hours for approval message in your dashboard inbox</p>
                </PopUpComponent>
            )}
        </>
    );
}

export default TutorListingForm;
