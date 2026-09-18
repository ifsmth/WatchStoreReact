import Section from "../components/ui/Section.jsx";
import FormField from "../components/ui/FormField.jsx";
import AppButton from "../components/ui/AppButton.jsx";

export default function CartPage() {
  const nameId = "order-name";
  const phoneId = "order-phone";
  const commentId = "order-comment";
  const noticeId = "order-notice";

  return (
    <Section id="cart" title="Оформлення замовлення">
      <form
        aria-label="Макет оформлення замовлення"
        aria-describedby={noticeId}
        onSubmit={(event) => event.preventDefault()}
      >
        <p id={noticeId}>
          Це макет форми для перевірки структури полів. Дані наразі не
          зберігаються.
        </p>

        <FormField id={nameId} label="Ім'я та Прізвище">
          <input
            type="text"
            id={nameId}
            name="customerName"
            placeholder="Введіть ваше ім'я"
          />
        </FormField>

        <FormField id={phoneId} label="Номер телефону">
          <input
            type="tel"
            id={phoneId}
            name="customerPhone"
            placeholder="+380..."
          />
        </FormField>

        <FormField
          id={commentId}
          label="Коментар до замовлення"
          hint="Вкажіть зручний час для дзвінка або відділення пошти."
        >
          <textarea
            id={commentId}
            name="comment"
            rows={3}
            defaultValue=""
            aria-describedby={`${commentId}-hint`}
          />
        </FormField>

        <div className="form-actions">
          <AppButton type="reset" variant="secondary">
            Очистити форму
          </AppButton>
          <AppButton disabled>Підтвердити замовлення (недоступно)</AppButton>
        </div>
      </form>
    </Section>
  );
}
