import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import "../../styles/views/CreateFreelancerProfile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { categories } from "../shared/categories";

interface FreelancerData {
  summary: string;
  expertise: string[];
  skills: { skill: string; level: string }[];
  interests: string[];
  languages: { language: string; level: string }[];
  certifications: string[];
  education: string[];
  experience: { companyName: string; position: string; startDate: string; endDate: string; responsibility: string }[];
  projects: string[];
  socialLinks: string[];
  references: { name: string; position: string; email: string }[];
  awards: string[];
  publications: string[];
  patents: string[];
  courses: string[];
  organizations: string[];
  volunteer: string[];
}

const initialFreelancerData: FreelancerData = {
  summary: "",
  expertise: [],
  skills: [{ skill: "", level: "" }],
  interests: [],
  languages: [{ language: "", level: "" }],
  certifications: [],
  education: [],
  experience: [{ companyName: "", position: "", startDate: "", endDate: "", responsibility: "" }],
  projects: [],
  socialLinks: [],
  references: [{ name: "", position: "", email: "" }],
  awards: [],
  publications: [],
  patents: [],
  courses: [],
  organizations: [],
  volunteer: [],
};

const internationalLanguages = [
  "English", "Spanish", "Mandarin", "French", "German", "Russian", "Portuguese", "Italian",
  "Arabic", "Hindi", "Japanese", "Korean", "Turkish", "Dutch", "Swedish", "Greek", "Czech",
  "Polish", "Finnish", "Hungarian", "Romanian", "Hebrew", "Thai", "Vietnamese", "Indonesian",
  "Malay", "Filipino", "Bengali", "Punjabi", "Tamil", "Urdu", "Persian"
];

const CreateFreelancerProfile: React.FC = () => {
  const [freelancerData, setFreelancerData] = useState<FreelancerData>(initialFreelancerData);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    section: keyof FreelancerData,
    index: number,
    field?: string
  ) => {
    const { value } = e.target;

    if (section === "summary") {
      setFreelancerData({ ...freelancerData, summary: value });
    } else {
      const updatedSection = [...freelancerData[section]];
      if (field) {
        updatedSection[index] = { ...updatedSection[index], [field]: value };
      } else {
        updatedSection[index] = value;
      }
      setFreelancerData({ ...freelancerData, [section]: updatedSection });
    }
  };

  const handleAddRow = (section: keyof FreelancerData, emptyRow: any) => {
    setFreelancerData({ ...freelancerData, [section]: [...freelancerData[section], emptyRow] });
  };

  const handleRemoveRow = (section: keyof FreelancerData, index: number) => {
    const updatedSection = freelancerData[section].filter((_, i) => i !== index);
    setFreelancerData({ ...freelancerData, [section]: updatedSection });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const uid = user.uid;
      const response = await api.post(`/api/freelancers/create?uid=${uid}`, freelancerData);
      console.log("Freelancer profile created successfully", response.data);
      alert("Freelancer profile created successfully");
    } catch (error) {
      console.error("Error creating freelancer profile:", handleError(error));
    }
  };

  return (
    <div className="create-freelancer-profile">
      <h1>Create Freelancer Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Summary</h2>
          <div className="form-group">
            <textarea
              name="summary"
              value={freelancerData.summary}
              onChange={(e) => handleChange(e, "summary", 0)}
              placeholder="Summary"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Expertise</h2>
          {freelancerData.expertise.map((expertise, index) => (
            <div key={index} className="form-group">
              <select
                name="expertise"
                value={expertise}
                onChange={(e) => handleChange(e, "expertise", index)}
                required
              >
                <option value="">Select Expertise</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <button type="button" onClick={() => handleRemoveRow("expertise", index)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddRow("expertise", "")}>
            + Add another expertise
          </button>
        </div>

        <div className="form-section">
          <h2>Skills</h2>
          {freelancerData.skills.map((skill, index) => (
            <div key={index} className="form-group skill-row">
              <input
                type="text"
                name="skill"
                value={skill.skill}
                onChange={(e) => handleChange(e, "skills", index, "skill")}
                placeholder="Skill"
                required
              />
              <select
                name="level"
                value={skill.level}
                onChange={(e) => handleChange(e, "skills", index, "level")}
                required
              >
                <option value="">Select Level</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
              <button type="button" onClick={() => handleRemoveRow("skills", index)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddRow("skills", { skill: "", level: "" })}>
            + Add another skill
          </button>
        </div>

        <div className="form-section">
          <h2>Languages</h2>
          {freelancerData.languages.map((language, index) => (
            <div key={index} className="form-group language-row">
              <select
                name="language"
                value={language.language}
                onChange={(e) => handleChange(e, "languages", index, "language")}
                required
              >
                <option value="">Select Language</option>
                {internationalLanguages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <select
                name="level"
                value={language.level}
                onChange={(e) => handleChange(e, "languages", index, "level")}
                required
              >
                <option value="">Select Level</option>
                <option value="basic">Basic</option>
                <option value="fluent">Fluent</option>
                <option value="advanced">Advanced</option>
                <option value="native">Native</option>
              </select>
              <button type="button" onClick={() => handleRemoveRow("languages", index)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddRow("languages", { language: "", level: "" })}>
            + Add another language
          </button>
        </div>

        <div className="form-section">
          <h2>Experience</h2>
          {freelancerData.experience.map((exp, index) => (
            <div key={index} className="form-group experience-row">
              <input
                type="text"
                name="companyName"
                value={exp.companyName}
                onChange={(e) => handleChange(e, "experience", index, "companyName")}
                placeholder="Company Name"
                required
              />
              <input
                type="text"
                name="position"
                value={exp.position}
                onChange={(e) => handleChange(e, "experience", index, "position")}
                placeholder="Position"
                required
              />
              <div className="date-row">
                <input
                  type="date"
                  name="startDate"
                  value={exp.startDate}
                  onChange={(e) => handleChange(e, "experience", index, "startDate")}
                  placeholder="Start Date"
                  required
                />
                <input
                  type="date"
                  name="endDate"
                  value={exp.endDate}
                  onChange={(e) => handleChange(e, "experience", index, "endDate")}
                  placeholder="End Date"
                  required
                />
              </div>
              <textarea
                name="responsibility"
                value={exp.responsibility}
                onChange={(e) => handleChange(e, "experience", index, "responsibility")}
                placeholder="Responsibility"
                required
              />
              <button type="button" onClick={() => handleRemoveRow("experience", index)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddRow("experience", { companyName: "", position: "", startDate: "", endDate: "", responsibility: "" })}>
            + Add another experience
          </button>
        </div>

        <div className="form-section">
          <h2>Projects</h2>
          {freelancerData.projects.map((project, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                name="projects"
                value={project}
                onChange={(e) => handleChange(e, "projects", index)}
                placeholder="Project"
                required
              />
              <button type="button" onClick={() => handleRemoveRow("projects", index)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddRow("projects", "")}>
            + Add another project
          </button>
        </div>

        <div className="form-section">
          <h2>Social Links</h2>
          {freelancerData.socialLinks.map((link, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                name="socialLinks"
                value={link}
                onChange={(e) => handleChange(e, "socialLinks", index)}
                placeholder="Social Link"
                required
              />
              <button type="button" onClick={() => handleRemoveRow("socialLinks", index)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddRow("socialLinks", "")}>
            + Add another link
          </button>
        </div>

        <div className="form-section">
          <h2>References</h2>
          {freelancerData.references.map((reference, index) => (
            <div key={index} className="form-group reference-row">
              <input
                type="text"
                name="name"
                value={reference.name}
                onChange={(e) => handleChange(e, "references", index, "name")}
                placeholder="Name"
                required
              />
              <input
                type="text"
                name="position"
                value={reference.position}
                onChange={(e) => handleChange(e, "references", index, "position")}
                placeholder="Position"
                required
              />
              <input
                type="email"
                name="email"
                value={reference.email}
                onChange={(e) => handleChange(e, "references", index, "email")}
                placeholder="Email"
                required
              />
              <button type="button" onClick={() => handleRemoveRow("references", index)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddRow("references", { name: "", position: "", email: "" })}>
            + Add another reference
          </button>
        </div>

        <div className="form-section">
          <h2>Awards</h2>
          {freelancerData.awards.map((award, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                name="awards"
                value={award}
                onChange={(e) => handleChange(e, "awards", index)}
                placeholder="Award"
                required
              />
              <button type="button" onClick={() => handleRemoveRow("awards", index)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddRow("awards", "")}>
            + Add another award
          </button>
        </div>

        <div className="form-section">
          <h2>Publications</h2>
          {freelancerData.publications.map((publication, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                name="publications"
                value={publication}
                onChange={(e) => handleChange(e, "publications", index)}
                placeholder="Publication"
                required
              />
              <button type="button" onClick={() => handleRemoveRow("publications", index)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddRow("publications", "")}>
            + Add another publication
          </button>
        </div>

        <div className="form-section">
          <h2>Patents</h2>
          {freelancerData.patents.map((patent, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                name="patents"
                value={patent}
                onChange={(e) => handleChange(e, "patents", index)}
                placeholder="Patent"
                required
              />
              <button type="button" onClick={() => handleRemoveRow("patents", index)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddRow("patents", "")}>
            + Add another patent
          </button>
        </div>

        <div className="form-section">
          <h2>Courses</h2>
          {freelancerData.courses.map((course, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                name="courses"
                value={course}
                onChange={(e) => handleChange(e, "courses", index)}
                placeholder="Course"
                required
              />
              <button type="button" onClick={() => handleRemoveRow("courses", index)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddRow("courses", "")}>
            + Add another course
          </button>
        </div>

        <div className="form-section">
          <h2>Organizations</h2>
          {freelancerData.organizations.map((organization, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                name="organizations"
                value={organization}
                onChange={(e) => handleChange(e, "organizations", index)}
                placeholder="Organization"
                required
              />
              <button type="button" onClick={() => handleRemoveRow("organizations", index)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddRow("organizations", "")}>
            + Add another organization
          </button>
        </div>

        <div className="form-section">
          <h2>Volunteer</h2>
          {freelancerData.volunteer.map((volunteer, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                name="volunteer"
                value={volunteer}
                onChange={(e) => handleChange(e, "volunteer", index)}
                placeholder="Volunteer"
                required
              />
              <button type="button" onClick={() => handleRemoveRow("volunteer", index)}>
                <FontAwesomeIcon icon={faTrashAlt} color="red" />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddRow("volunteer", "")}>
            + Add another volunteer activity
          </button>
        </div>

        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateFreelancerProfile;