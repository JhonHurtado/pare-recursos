import Button from "../ui/button/Button";
import Spinner from "./Spinner";


interface HeaderTexts {
  titles: {
    edit: string;
    create: string;
  };
  descriptions: {
    edit: string;
    create: string;
  };
  buttons: {
    cancel: string;
    update: string;
    create: string;
  };
}

interface HeaderProps {
  isEditing: boolean;
  onCancel: () => void;
  loading: boolean;
  handleSave: () => void;
  position?: 'top' | 'bottom';
  texts: HeaderTexts;
}
export default function HeaderViews({
  isEditing,
  onCancel,
  loading,
  handleSave,
  position = 'top',
  texts
}: HeaderProps) {
    
    return (
        <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className={`flex items-center ${position === 'top' ? 'justify-between' : "justify-center"} flex-wrap`}>
                    {position === 'top' && (
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                                {isEditing ? texts.titles.edit : texts.titles.create}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                                {isEditing ? texts.descriptions.edit : texts.descriptions.create}
                            </p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={loading}
                            className="min-w-[100px]"
                        >
                            {texts.buttons.cancel}
                        </Button>

                        <Button
                            onClick={handleSave}
                            disabled={loading}
                            type='submit'
                            className="bg-grey-600 hover:bg-gray-900 text-white min-w-[140px]"
                        >
                            {loading && <Spinner />}
                            {!loading && (
                                <>
                                    {isEditing ? (
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    )}
                                </>
                            )}
                            {isEditing ? texts.buttons.update : texts.buttons.create}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}