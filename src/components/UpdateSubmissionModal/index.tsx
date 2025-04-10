import { useState, useEffect } from 'react';
import { Modal } from '@/components/Modal';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { updateSubmission, type Submission } from '@/api/submissions';
import toast from 'react-hot-toast';

type UpdateSubmissionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  submission: Submission;
  onSuccess: () => void;
};

const regions = [
  { value: 'Автономна Республіка Крим', label: 'Автономна Республіка Крим' },
  { value: 'Вінницька', label: 'Вінницька область' },
  { value: 'Волинська', label: 'Волинська область' },
  { value: 'Дніпропетровська', label: 'Дніпропетровська область' },
  { value: 'Донецька', label: 'Донецька область' },
  { value: 'Житомирська', label: 'Житомирська область' },
  { value: 'Закарпатська', label: 'Закарпатська область' },
  { value: 'Запорізька', label: 'Запорізька область' },
  { value: 'Івано-Франківська', label: 'Івано-Франківська область' },
  { value: 'Київська', label: 'Київська область' },
  { value: 'Кіровоградська', label: 'Кіровоградська область' },
  { value: 'Луганська', label: 'Луганська область' },
  { value: 'Львівська', label: 'Львівська область' },
  { value: 'Миколаївська', label: 'Миколаївська область' },
  { value: 'Одеська', label: 'Одеська область' },
  { value: 'Полтавська', label: 'Полтавська область' },
  { value: 'Рівненська', label: 'Рівненська область' },
  { value: 'Сумська', label: 'Сумська область' },
  { value: 'Тернопільська', label: 'Тернопільська область' },
  { value: 'Харківська', label: 'Харківська область' },
  { value: 'Херсонська', label: 'Херсонська область' },
  { value: 'Хмельницька', label: 'Хмельницька область' },
  { value: 'Черкаська', label: 'Черкаська область' },
  { value: 'Чернівецька', label: 'Чернівецька область' },
  { value: 'Чернігівська', label: 'Чернігівська область' },
];

const categories = [
  { value: 'Інноваційні та цифрові рішення для забезпечення безпеки на роботі', label: 'Інноваційні та цифрові рішення для забезпечення безпеки на роботі' },
  { value: 'Ефективні програми психосоціальної підтримки на роботі та її реалізація', label: 'Ефективні програми психосоціальної підтримки на роботі та її реалізація' },
  { value: 'Мистецтво, що рятує життя', label: 'Мистецтво, що рятує життя' },
];

const ART_CATEGORY = 'Мистецтво, що рятує життя';
const EFFECTIVE_PROGRAMS_CATEGORY = 'Ефективні програми психосоціальної підтримки на роботі та її реалізація';
const INNOVATIVE_SOLUTIONS_CATEGORY = 'Інноваційні та цифрові рішення для забезпечення безпеки на роботі';

const subcategories = [
  { value: 'Постери та інформаційні плакати', label: 'Постери та інформаційні плакати' },
  { value: 'Художні фото та колажі', label: 'Художні фото та колажі' },
  { value: 'Малюнки', label: 'Малюнки' },
  { value: 'Відеоролики', label: 'Відеоролики' },
];

export const UpdateSubmissionModal = ({ isOpen, onClose, submission, onSuccess }: UpdateSubmissionModalProps) => {
  const [formData, setFormData] = useState({
    fullName: submission.fullName,
    region: submission.region,
    email: submission.email,
    phoneNumber: submission.phoneNumber,
    age: submission.age,
    comment: submission.comment,
    agreement: submission.agreement as "YES" | "NO",
    category: submission.category,
    birthYear: submission.birthYear || 2000,
    primaryActivityType: submission.primaryActivityType || '',
    employerRegion: submission.employerRegion || '',
    employerLocality: submission.employerLocality || '',
    subcategory: submission.subcategory || subcategories[0].value,
    companyName: submission.companyName || '',
    employeeCount: submission.employeeCount || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let requestData;

      switch (formData.category) {
        case ART_CATEGORY:
          requestData = {
            fullName: formData.fullName,
            region: formData.region,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            age: formData.age,
            comment: formData.comment,
            agreement: formData.agreement,
            category: formData.category,
            birthYear: new Date().getFullYear() - parseInt(String(formData.age)),
            primaryActivityType: formData.primaryActivityType,
            employerRegion: formData.employerRegion,
            employerLocality: formData.employerLocality,
            subcategory: formData.subcategory,
          };
          break;
        case EFFECTIVE_PROGRAMS_CATEGORY:
        case INNOVATIVE_SOLUTIONS_CATEGORY:
          requestData = {
            fullName: formData.fullName,
            region: formData.region,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            age: formData.age,
            comment: formData.comment,
            agreement: formData.agreement,
            category: formData.category,
            companyName: formData.companyName,
            primaryActivityType: formData.primaryActivityType,
            employerRegion: formData.employerRegion,
            employerLocality: formData.employerLocality,
            employeeCount: formData.employeeCount,
          };
          break;
        default:
          throw new Error('Invalid category');
      }

      await updateSubmission(submission.id, requestData);
      toast.success('Роботу успішно оновлено');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Update error:', error);
      toast.error(error?.response?.data?.message || 'Помилка при оновленні роботи');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <Modal closeModal={onClose}>
      <div className="p-6 w-[600px]">
        <h2 className="text-2xl font-bold mb-6">Оновити роботу</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Категорія</h3>
          <p className="text-gray-700 mt-1">{formData.category}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Особиста інформація</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Повне ім&apos;я</label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Область</label>
                <Select
                  value={formData.region}
                  onChange={(e) => handleSelectChange('region', e.target.value)}
                  options={regions}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Номер телефону</label>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Art Category Specific Fields */}
          {formData.category === ART_CATEGORY && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Додаткова інформація</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Вік</label>
                  <Input
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Тип основної діяльності</label>
                  <Input
                    name="primaryActivityType"
                    value={formData.primaryActivityType}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Підкатегорія</label>
                  <Select
                    value={formData.subcategory}
                    onChange={(e) => handleSelectChange('subcategory', e.target.value)}
                    options={subcategories}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Область роботодавця</label>
                  <Select
                    value={formData.employerRegion}
                    onChange={(e) => handleSelectChange('employerRegion', e.target.value)}
                    options={regions}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Населений пункт роботодавця</label>
                  <Input
                    name="employerLocality"
                    value={formData.employerLocality}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Other Categories Specific Fields */}
          {(formData.category === EFFECTIVE_PROGRAMS_CATEGORY || formData.category === INNOVATIVE_SOLUTIONS_CATEGORY) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Інформація про компанію</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Назва компанії</label>
                  <Input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Тип основної діяльності</label>
                  <Input
                    name="primaryActivityType"
                    value={formData.primaryActivityType}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Область роботодавця</label>
                  <Select
                    value={formData.employerRegion}
                    onChange={(e) => handleSelectChange('employerRegion', e.target.value)}
                    options={regions}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Населений пункт роботодавця</label>
                  <Input
                    name="employerLocality"
                    value={formData.employerLocality}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Кількість працівників</label>
                  <Input
                    name="employeeCount"
                    type="number"
                    value={formData.employeeCount}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Comment Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Додатково</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Коментар</label>
              <Input
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button type="button" variant="secondary" onClick={onClose} className="min-w-[120px]">
              Скасувати
            </Button>
            <Button type="submit" className="min-w-[120px]">
              Оновити
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}; 