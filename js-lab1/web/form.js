// Sections 12–13 exercise: the "Add a course" form, built by hand with the DOM.
// Run it:  npm run web   → open http://localhost:5500/web/
// Finish src/s11-catalog.js (departments) and src/s13-forms.js first.
import { courses } from "../data/courses.js";
import { departments } from "../src/s11-catalog.js";
import { isComplete, toCourse } from "../src/s13-forms.js";

// Step 1 — select the elements you need (querySelector / querySelectorAll).
const form = document.querySelector("#add-course");
const fields = Array.from(form.querySelectorAll("input, select"));
const submit = form.querySelector('button[type="submit"]');
const departmentSelect = form.querySelector('select[name="department"]');
const list = document.querySelector("#course-list");
const count = document.querySelector("#count");
const status = document.querySelector("#status");

// A closure that hands out ids after the catalogue's last one (20).
const nextId = (() => {
  let last = 20;
  return () => ++last;
})();

// Step 2 — fill the department dropdown from the data.
// Hint: departments(courses).map((name) => new Option(name, name))
for (const name of departments(courses)) {
  departmentSelect.append(new Option(name, name));
}

// Step 3 — read every field into one object: { code, title, department, credits }.
// Hint: reduce over fields with a computed key [field.name].
function readForm() {
  return fields.reduce((obj, field) => {
    obj[field.name] = field.value;
    return obj;
  }, {});
}

// Step 4 — enable the button only when the form is complete.
// Listen for "input" on the FORM (every field's event bubbles up to it).
form.addEventListener("input", () => {
  submit.disabled = !isComplete(readForm());
});

// Step 5 — on "submit": stop the page reload, build the course with
// toCourse(values, nextId), append renderItem(course) to the list,
// update the count and status, reset the form, disable the button again.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const values = readForm();
  const course = toCourse(values, nextId);
  list.append(renderItem(course));
  count.textContent = list.querySelectorAll(".item").length;
  status.textContent = "";
  form.reset();
  submit.disabled = true;
});

// Step 6 — one list item per course. Clicking the item toggles the
// "selected" class; clicking Remove removes it WITHOUT also selecting it.
function renderItem(course) {
  const item = document.createElement("li");
  item.className = "item";
  item.dataset.id = course.id;

  const span = document.createElement("span");
  span.textContent = `${course.code} · ${course.title} · ${course.credits} cr`;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.type = "button";

  item.append(span, removeBtn);

  // item click → toggle "selected"
  item.addEventListener("click", (e) => {
    if (e.target === removeBtn) return;
    item.classList.toggle("selected");
  });

  // remove click → remove the item (watch the bubbling!)
  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent the item's click handler from firing
    item.remove();
    count.textContent = list.querySelectorAll(".item").length;
    if (list.querySelectorAll(".item").length === 0) {
      status.textContent = "No courses added yet.";
    }
  });

  return item;
}
